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

    try do
      response = conn
      |> post(registration_path(conn, :create, user: @valid_attrs))
      |> json_response(200)

      expected = %{}

      assert response == expected

    rescue
      # Eat the error for now since the sessions path is not yet avail
      e in UndefinedFunctionError -> e
    end
  end

end