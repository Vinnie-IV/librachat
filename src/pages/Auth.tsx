import { useState } from "react";
import librasWoman from "@/assets/libras-woman.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Estados para Login
  const [loginData, setLoginData] = useState({
    email: "",
    senha: ""
  });

  // Estados para Registro
  const [registerData, setRegisterData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    matricula: ""
  });

  // Função de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Importante para sessions
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      setSuccess("Login realizado com sucesso!");
      
      // Redirecionar para o chat após 1 segundo
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função de Registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validar senhas
    if (registerData.senha !== registerData.confirmaSenha) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: registerData.nome,
          sobrenome: registerData.sobrenome,
          email: registerData.email,
          senha: registerData.senha,
          matricula: registerData.matricula,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta");
      }

      setSuccess("Conta criada com sucesso! Faça login para continuar.");
      
      // Limpar formulário e trocar para login após 2 segundos
      setTimeout(() => {
        setRegisterData({
          nome: "",
          sobrenome: "",
          email: "",
          senha: "",
          confirmaSenha: "",
          matricula: ""
        });
        setIsLogin(true);
        setSuccess("");
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl bg-card rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Ilustração de Boas-vindas - Esquerda */}
          <div className="hidden lg:flex relative auth-gradient flex-col justify-between overflow-hidden">
            <div className="pt-12 px-8 text-center z-10">
              <h2 className="text-4xl xl:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Olá, Bem Vindo ao Libra Chat
              </h2>
              <p className="text-xl text-white/90 drop-shadow">
                Seu espaço para aprender Libras de forma simples e interativa
              </p>
            </div>
            <div className="flex items-end justify-center w-full">
              <img
                src={librasWoman}
                alt="Mulher fazendo linguagem de sinais - Libras"
                className="w-full max-w-lg xl:max-w-xl h-auto object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Formulário - Direita */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            {/* Título mobile - apenas para telas pequenas */}
            <div className="lg:hidden mb-8 text-center space-y-4">
              <div className="auth-gradient p-6 rounded-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Olá, Bem Vindo ao Libra Chat
                </h2>
                <p className="text-white/90 text-sm sm:text-base">
                  Seu espaço para aprender Libras de forma simples e interativa
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {isLogin ? "Entrar na conta" : "Criar nova conta"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Entre com suas credenciais para acessar"
                  : "Preencha os dados para começar"}
              </p>
            </div>

            {/* Mensagens de Erro e Sucesso */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {success}
              </div>
            )}

            {/* Formulário de Login */}
            {isLogin ? (
              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-foreground">E-mail</span>
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="input input-bordered w-full bg-white border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-foreground">Senha</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginData.senha}
                    onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                    className="input input-bordered w-full bg-white border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover text-primary font-medium">
                      Esqueceu a senha?
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-full auth-gradient text-white border-none h-12 rounded-xl text-base font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </form>
            ) : (
              /* Formulário de Registro */
              <form className="space-y-5" onSubmit={handleRegister}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-foreground">Nome</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={registerData.nome}
                      onChange={(e) => setRegisterData({ ...registerData, nome: e.target.value })}
                      className="input input-bordered w-full bg-white border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium text-foreground">Sobrenome</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Seu sobrenome"
                      value={registerData.sobrenome}
                      onChange={(e) => setRegisterData({ ...registerData, sobrenome: e.target.value })}
                      className="input input-bordered w-full bg-white border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-foreground">Matrícula</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sua matrícula"
                    value={registerData.matricula}
                    onChange={(e) => setRegisterData({ ...registerData, matricula: e.target.value })}
                    className="input input-bordered w-full bg-white border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-foreground">E-mail</span>
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="input input-bordered w-full bg-white border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-foreground">Senha</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={registerData.senha}
                    onChange={(e) => setRegisterData({ ...registerData, senha: e.target.value })}
                    className="input input-bordered w-full bg-white border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-foreground">Confirmação de Senha</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={registerData.confirmaSenha}
                    onChange={(e) => setRegisterData({ ...registerData, confirmaSenha: e.target.value })}
                    className="input input-bordered w-full bg-white border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl h-12"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-full auth-gradient text-white border-none h-12 rounded-xl text-base font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  {loading ? "Registrando..." : "Registrar-se"}
                </button>
              </form>
            )}

            {/* Alternar entre Login e Registro */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-primary font-semibold hover:underline transition-all duration-300"
                >
                  {isLogin ? "Registre-se aqui" : "Faça login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;