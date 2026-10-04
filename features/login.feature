Feature: Teste de login

  Scenario: Login com sucesso
    Given que o usuário está na página de login
    When o usuário insere o email "usuario@example.com" e a senha "1q2w3e4r"
    Then ele deve ser redirecionado para a página de boas-vindas

  Scenario: Login com credenciais inválidas
    Given que o usuário está na página de login
    When o usuário insere o email "invalido@exemple.com" e a senha "senhaerrada"
    Then ele deve ver uma mensagem de erro indicando falha no login

  Scenario: Login com campos obrigatórios vazios
    Given que o usuário está na página de login
    When o usuário deixa os campos de email e senha vazios
    Then ele deve ver uma mensagem de erro informando que os dados são obrigatórios