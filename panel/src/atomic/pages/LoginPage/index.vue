<template>
  <AuthenticationTemplate>
    <LoginFormOrganism
      :texts="{
        email: {
          label: 'E-email:*',
          placeholder: 'Enter user e-mail...'
        },
        password: {
          label: 'Password:*',
          placeholder: 'Enter user password...'
        },
        button: 'Login in to platform',
        spinnerMessage: '',
        alerts: {
          success: {
            title: 'Success authentication',
            description: 'Correct login to the platform. There will be a redirection in a moment.',
          },
          error: {
            title: 'Error authentication',
            description: `Incorrect login to the panel.
              Incorrect e-mail or password. Please try again in a moment.`,
          },
        },
      }"
    />
  </AuthenticationTemplate>
</template>
<script src="./component.ts" lang="ts" />
