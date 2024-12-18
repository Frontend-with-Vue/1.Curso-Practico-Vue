<template>
  <div class="register-container">
    <h2>{{ title }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Campo de nombre -->
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
        />
      </div>

      <!-- Campo de correo electrónico -->
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
        />
      </div>

      <!-- Campo de contraseña -->
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />
        <small v-if="password && !isPasswordStrong" class="error">La contraseña debe contener al menos 8 caracteres, una letra mayúscula, un número y un símbolo.</small>
      </div>

      <!-- Campo de confirmación de contraseña -->
      <div class="form-group">
        <label for="confirmPassword">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
        <small v-if="confirmPassword && confirmPassword !== password" class="error">Las contraseñas no coinciden.</small>
      </div>

      <button type="submit" :disabled="!isFormValid">{{ submitButtonText }}</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <div class="login-link">
      <p>¿Ya tienes cuenta? <router-link to="/login">Iniciar sesión</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'RegisterForm',
  props: {
    title: {
      type: String,
      default: 'Registrarse'
    },
    submitButtonText: {
      type: String,
      default: 'Registrarse'
    }
  },
  emits: ['submit-success', 'submit-error'],
  setup(props, { emit }) {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');

    // Lógica de validación de la contraseña
    const isPasswordStrong = computed(() => {
      const passwordValue = password.value;
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(passwordValue);
    });

    // Validar si el formulario es válido
    const isFormValid = computed(() => {
      return (
        name.value &&
        email.value &&
        isPasswordStrong.value &&
        password.value === confirmPassword.value
      );
    });

    const handleSubmit = async () => {
      try {
        // Emitir datos al componente padre
        emit('submit-success', { name: name.value, email: email.value, password: password.value });
        errorMessage.value = ''; // Limpiar el mensaje de error al enviar
      } catch (error) {
        errorMessage.value = 'Error al enviar el formulario';
        emit('submit-error', errorMessage.value);
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      errorMessage,
      handleSubmit,
      isPasswordStrong,
      isFormValid,
    };
  },
};
</script>

<style scoped>
.login-link {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Títulos */
h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Estilos para los grupos de formulario */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #555;
  font-weight: bold;
}

/* Estilos para los inputs */
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: white;
  color: black;
}

/* Estilo del botón */
button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilos para los mensajes de error */
.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

small {
  font-size: 0.8em;
  color: #e74c3c;
}

/* Ajustes para dispositivos móviles */
@media (max-width: 600px) {
  .register-container {
    width: 90%;
    padding: 15px;
  }
  h2 {
    font-size: 20px;
  }
  input {
    padding: 12px;
  }
  button {
    padding: 14px;
  }
}
</style>
