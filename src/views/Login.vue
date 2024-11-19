<template>
  <main>
    <MinkaLogoBig />
    <LoginForm
      title="Iniciar Sesión"
      submitButtonText="Iniciar Sesión"
      @submit-success="handleLoginSuccess"
      @submit-error="handleLoginError"
    />
    <div class="register-link">
      <p>¿No tienes cuenta? <router-link to="/register">Registrarse</router-link></p>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import LoginForm from "../components/LoginForm.vue";
import { apiBaseUrl } from "../apiConfig.js";
import MinkaLogoBig from "../components/CashFlowLogoBig.vue";

export default {
  components: {
    MinkaLogoBig,
    LoginForm,
  },
  methods: {
    async handleLoginSuccess(credentials) {
      try {
        const response = await axios.post(apiBaseUrl + '/user/login', {
          email: credentials.email,
          password: credentials.password,
        });
        if (response.data.body.success) {
          alert('¡Bienvenido!');

          // Guardar en sessionStorage
          const userData = response.data.body.data;
          sessionStorage.setItem('UserId', userData.id);
          sessionStorage.setItem('UserName', userData.name);
          sessionStorage.setItem('UserSystemRole', userData.system_role);
          sessionStorage.setItem('UserToken', userData.access_token);

          // Guardar en localStorage (para la guardia global)
          localStorage.setItem('authToken', userData.access_token);

          // Redirigir a la vista principal
          this.$router.push({ path: '/home' });
        } else {
          this.handleLoginError(response.data.body.error || 'Credenciales incorrectas.');
        }
      } catch (error) {
        this.handleLoginError("Login error:" + error.response.data.body.error);
      }
    },
    handleLoginError(errorMessage) {
      console.error(errorMessage);
    },
  },
};
</script>

<style scoped>
/* Estilo general del contenedor principal */
main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  padding: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

main > *:first-child {
  margin-bottom: 20px;
}

p {
  font-size: 14px;
  color: #333;
  margin: 0;
  padding: 0;
}

.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

.error {
  color: #e74c3c;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

@media (max-width: 600px) {
  main {
    width: 90%;
    padding: 15px;
  }

  p {
    font-size: 12px;
  }
}
</style>
