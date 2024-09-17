iProc adalah web-app untuk management users

link deploy: https://iproc-andryariadi.vercel.app

Tech stack:
Language: JavaScript
Frontend: React Js, Next Js, Zustand, React Hook Form, Zod, Axios, React Query, Tailwind, Jest, React Testing Library

Data API diambil dari https://dummyjson.com/docs

Feature:

1. Authentication (login)
2. Authorization (Only admin can create and delete users, Cannot access other users' profiles)
3. CRUD users
4. Sort and Order
5. Search
6. Responsive

How to use the application:

1. Lakukan authentication (login)
2. Masukkan username dan password: - Untuk role admin:
   username: "emilys",
   password: "emilyspass", - Untuk role selain admin:
   username: "alexanderj",
   password: "alexanderjpass",
   Jika ingin menggunakan user yang lain bisa mengunjungi alamat ini https://dummyjson.com/user
3. Setelah proses athentication maka bisa melakukan CRUD, seperti yang dijelaskan sebelumnya jika rolenya bukan admin maka tidak bisa melakukan create dan delete users
