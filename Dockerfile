# ─── Stage: Production ───────────────────────────────────────────────────────
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /app

# Copy package files terlebih dahulu (layer caching)
COPY package*.json ./

# Install hanya production dependencies
RUN npm ci --omit=dev

# Copy seluruh source code ke dalam container
COPY . .

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
