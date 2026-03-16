#!/bin/bash

echo "Starting Ubuntu baseline hardening..."

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install security packages
echo "Installing security tools..."
sudo apt install -y fail2ban unattended-upgrades rkhunter auditd

# Enable automatic security updates
echo "Configuring unattended upgrades..."
sudo dpkg-reconfigure -f noninteractive unattended-upgrades

# Configure firewall
echo "Configuring UFW firewall..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw --force enable

# Harden SSH configuration
echo "Hardening SSH..."
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

sudo sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/#MaxAuthTries.*/MaxAuthTries 3/' /etc/ssh/sshd_config

sudo systemctl restart ssh

# Enable Fail2ban
echo "Enabling fail2ban..."
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Run rootkit scan update
echo "Updating rkhunter database..."
sudo rkhunter --update
sudo rkhunter --propupd

# Enable auditd
echo "Enabling audit logging..."
sudo systemctl enable auditd
sudo systemctl start auditd

echo "Hardening complete."
echo "Recommended: reboot the system."
