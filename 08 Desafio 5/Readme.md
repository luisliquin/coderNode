# Implementación de Login

## Consigna

El objetivo es ajustar nuestro servidor principal para trabajar con un sistema de login.

### Aspectos a incluir

- Incluir todas las vistas realizadas en el hands on lab, así como las rutas de router para procesar el registro y el login.
- Una vez completado el login, redirigir directamente a la vista de productos.
- Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario.
- Implementar un sistema de roles donde:
  - `adminCoder@coder.com` con contraseña `adminCod3r123` tenga un rol de administrador.
  - Todos los demás usuarios tendrán un rol de "usuario".
- Implementar botón de "logout" para destruir la sesión y redirigir a la vista de login.

## Formato de entrega

Proporcionar el link al repositorio de Github sin incluir la carpeta `node_modules`.

## Sugerencias

- Enfocarse en la funcionalidad de las sesiones más que en la presentación.
- Asegurarse de las correctas redirecciones entre las múltiples vistas.

## Proceso de Testing

### Login por Formulario
1. Al cargar el proyecto, iniciar en la pantalla de login.
2. Desde la pantalla de login, acceder al formulario de registro a través de un link "Regístrate".
3. El registro debe guardar al usuario en la base de datos y regresar a la pantalla de login.
4. Intentar iniciar sesión con credenciales incorrectas para confirmar la seguridad.
5. Iniciar sesión con las credenciales correctas y verificar la redirección a la vista de productos.
6. Confirmar que la vista de productos muestre un mensaje "Bienvenido" seguido por los datos del usuario, incluyendo su rol, pero excluyendo la contraseña.
7. Utilizar el botón de logout para destruir la sesión y verificar que redirige al login.
8. Iniciar sesión con las credenciales del administrador y confirmar que el rol se muestra como "admin".
9. Asegurarse de que el administrador no se guarde en la base de datos y que la validación sea interna en el código.