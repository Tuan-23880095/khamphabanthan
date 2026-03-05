import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/khamphabanthan/', // <--- Phải thêm dòng này, tên đúng bằng tên kho lưu trữ của bạn
})
