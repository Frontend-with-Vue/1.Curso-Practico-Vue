<template>
  <main class="register-page">
    <RegisterForm
      title="Crear Cuenta"
      submitButtonText="Registrarse"
      @submit-success="handleRegisterSuccess"
      @submit-error="handleRegisterError"
      :error-message="errorMessage"
    />
  </main>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';
import axios from 'axios';
import { apiBaseUrl } from "../apiConfig.js";

export default {
  components: {
    RegisterForm
  },
  data() {
    return {
      errorMessage: ''
    };
  },
  methods: {
    async handleRegisterSuccess(credentials) {
      try {
        const response = await axios.post(apiBaseUrl + '/user/register', {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          system_role: "user"
        });

        if (response.data.body.success) {
          alert('¡Cuenta creada exitosamente!');
          this.$router.push('/login');
        } else {
          this.handleRegisterError(response.data.body.error || 'Error al registrar la cuenta.');
        }
      } catch (error) {
        this.handleRegisterError(error.response.data.body.error || 'Error desconocido al registrar.');
      }
    },
    handleRegisterError(errorMessage) {
      this.errorMessage = errorMessage;
      console.error("Register error:", errorMessage);
    }
  }
};
</script>

<style scoped>
/* Centrado del contenedor principal */
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

/* Logo */
img {
  max-width: 260px;
}

/* Estilo para el contenedor del formulario de registro */
.register-page .register-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.register-page .register-container h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Estilos del error general */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
}
</style>
