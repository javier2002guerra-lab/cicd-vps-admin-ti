# Configuracion inicial de la VPS

Esta guia prepara una VPS Ubuntu para recibir despliegues automaticos desde GitHub Actions.

## 1. Actualizar el servidor

```bash
sudo apt update
sudo apt upgrade -y
```

## 2. Instalar Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo systemctl enable docker
sudo systemctl start docker
```

## 3. Crear usuario de despliegue

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG docker deploy
```

Cerrar sesion y volver a entrar si se necesita probar Docker con el usuario `deploy`.

## 4. Crear llave SSH para GitHub Actions

En tu computadora:

```bash
ssh-keygen -t ed25519 -C "github-actions-cicd" -f cicd_vps_key
```

Copiar la llave publica a la VPS:

```bash
ssh-copy-id -i cicd_vps_key.pub deploy@IP_DE_LA_VPS
```

La llave privada completa `cicd_vps_key` se guarda como secreto `SSH_PRIVATE_KEY` en GitHub.

## 5. Abrir puertos

En el panel del proveedor cloud permitir:

- `22/tcp` para SSH.
- `80/tcp` para HTTP.

Si usas firewall local:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable
```

## 6. Secretos requeridos en GitHub

En `Settings > Secrets and variables > Actions`:

```text
SSH_HOST=IP_DE_LA_VPS
SSH_USER=deploy
SSH_PRIVATE_KEY=contenido_de_cicd_vps_key
SSH_PORT=22
```
