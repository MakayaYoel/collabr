# collabr

My attempt at a real-time code collaboration web application that allows multiple users to edit code in "rooms" in real-time.

**Languages/Frameworks/Libraries Used:** TypeScript, Next.js, Socket.IO, Shadcn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MakayaYoel/collabr
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

3. **Setup environment variables**
   - Go to the ``frontend`` directory.
   - Rename ``.env.example`` to ``.env``
   - Set any backend server URL (e.g. ``http://localhost:5000``)

4. **Run the development servers:**

   - **Frontend:**

     ```bash
     cd frontend
     npm run dev
     ```

   - **Backend:**

     ```bash
     cd backend
     npm run dev
     ```

5. **Open your browser:**

   Visit [``http://localhost:3000``](http://localhost:3000) and that's it :)

## TODO
___oh boy.___

- [❌] Convert backend to TypeScript
- [❌] Add room chats
- [❌] Make editor page responsive
- [❌] Implement file system
- [❌] Add user cursors
- [❌] Add input system