defmodule PhoenixTrello.Board do
  use PhoenixTrello.Web, :model

  alias __MODULE__
  alias PhoenixTrello.{User, UserBoard}

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

  def not_owned_by(query \\ %Board{}, user_id) do
    from b in query,
    where: b.user_id != ^user_id
  end

  def slug_id(board) do
    "#{board.id}-todo"
  end

  def preload_all(query) do
    from b in query, preload: [:user, :members]
  end
end

defimpl Poison.Encoder, for: PhoenixTrello.Board do
  def encode(model, options) do
    model
    |> Map.take([:name, :user, :members, :id])
#    |> Map.put(:id, PhoenixTrello.Board.slug_id(model))
    |> Poison.Encoder.encode(options)
  end
end