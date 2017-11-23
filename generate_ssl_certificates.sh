#!/bin/bash

set -ue


KEY="server/key.pem"
CERT="server/cert.pem"


if [ -f "$KEY" ] && [ -f "$CERT" ]; then
  echo "Certificates already exist."
  exit
fi


CSR="$(mktemp)"
PASSPHRASE="$(mktemp)"

trap "rm -f '$CSR' '$PASSPHRASE'" EXIT


# Generate Passphrase
openssl rand -base64 48 > "$PASSPHRASE"

# Generate a Private Key
openssl genrsa -aes128 -passout file:"$PASSPHRASE" -out "$KEY" 2048

# Generate a CSR (Certificate Signing Request)
openssl req -new -passin file:"$PASSPHRASE" -key "$KEY" -out "$CSR" \
  -subj "/C=AT/ST=Tyrol/L=Innsbruck/O=Arriven/OU=Web Services/CN=localhost"

# Remove Passphrase from Key
openssl rsa -in "$KEY" -passin file:"$PASSPHRASE" -out "$KEY"

# Generating a Self-Signed Certificate for 100 Years
openssl x509 -req -days 36500 -in "$CSR" -signkey "$KEY" -out "$CERT"
