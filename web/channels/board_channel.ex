
defmodule PhoenixTrello.BoardChannel do
  use PhoenixTrello.Web, :channel

  alias PhoenixTrello.{User, Board, UserBoard}
  alias PhoenixTrello.BoardChannel.Monitor

  def join("boards:" <> board_id, _params, socket) do
    current_user = socket.assigns.current_user
    board = get_current_board(socket, board_id)

    connected_users = Monitor.member_joined(board_id, current_user.id)

    send(self, {:after_join, connected_users})

    {:ok, %{board: board}, assign(socket, :board, board)}
  end

  def handle_info({:after_join, connected_users}, socket) do
    broadcast! socket, "user:joined", %{users: connected_users}

    {:noreply, socket}
  end

  def handle_in("members:add", %{"email" => email}, socket) do
    try do
      board = socket.assigns.board
      user = User
      |> Repo.get_by(email: email)

      changeset = user
      |> build_assoc(:user_boards)
      |> UserBoard.changeset(%{board_id: board.id})

      case Repo.insert(changeset) do
        {:ok, _board_user} ->
          broadcast! socket, "member:added", %{user: user}

          PhoenixTrello.Endpoint.broadcast_from! self(), "users:#{user.id}", "boards:add", %{board: board}
          {:noreply, socket}
        {:error, _changeset} ->
          {:reply, {:error, %{error: "Error adding new member"}}, socket}
      end
    catch
      _, _-> {:reply, {:error, %{error: "User does not exist"}}, socket}
    end
  end

  def terminate(_reason, socket) do
    board_id = Board.slug_id(socket.assigns.board)
    user_id = socket.assigns.current_user.id

    broadcast! socket, "user:left", %{users: Monitor.member_left(board_id, user_id)}

    :ok
  end

  defp get_current_board(socket, board_id) do
    socket.assigns.current_user
    |> assoc(:boards)
    |> Repo.get(board_id)
  end
end