defmodule PhoenixTrello.Board do
  use PhoenixTrello.Web, :model

  alias __MODULE__
  alias PhoenixTrello.{User, UserBoard}

  @derive {Poison.Encoder, only: [:id, :name, :user]}

  schema "boards" do
    field :name, :string
    belongs_to :user, User
    has_many :user_boards, UserBoard
    has_many :members, through: [:user_boards, :user]

    timestamps()
  end

  @required_fields ~w(name user_id)
  @optional_fields ~w()

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
  end

  def slug_id(board) do
    "#{board.id}-todo"
  end

  def preload_all(query) do
    from b in query, preload: [:user]
  end
end
