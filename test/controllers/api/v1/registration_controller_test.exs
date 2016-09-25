defmodule PhoenixTrello.RegistrationControllerTest do
  use PhoenixTrello.ConnCase, async: true

  @valid_attrs %{
    email: "email@email.com",
    encrypted_password: "some content",
    first_name: "some content",
    last_name: "some content",
    password: "123456"
  }

  test "create responds", %{conn: conn} do

    response = conn
    |> post(registration_path(conn, :create, user: @valid_attrs))
    |> json_response(201)

    assert response |> Map.keys == ["jwt", "user"]
    assert response["user"] |> Map.keys |> Enum.sort == ["email", "first_name", "id", "last_name"]

  end

end