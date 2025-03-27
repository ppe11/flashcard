# Love At First Paw - Adoption Website

## Project Overview
Love At First Paw is an adoption website built with Next.js. It helps users find adoptable pets and shelters using the Petfinder API and provides map and direction services using Mapbox.

## Prerequisites
Before running the project locally, ensure you have the following installed:

### Windows
1. **Install Node.js:**
   - Open a web browser and go to [Node.js official website](https://nodejs.org/)
   - Download and install the latest **LTS** version.
   - Open the **Command Prompt** by searching for `cmd` in the Start Menu.
   - Verify installation by typing:
     ```sh
     node -v
     npm -v
     ```

2. **Install Git:**
   - Go to [Git official website](https://git-scm.com/) and download the latest version.
   - Run the installer and follow the setup instructions.
   - Open **Command Prompt** and verify installation:
     ```sh
     git --version
     ```

### MacOS
1. **Install Homebrew (if not installed):**
   - Open the **Terminal** application (search for it in Spotlight or find it in Applications > Utilities).
   - Copy and paste the following command, then press **Enter**:
     ```sh
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```

2. **Install Node.js:**
   - In the **Terminal**, type:
     ```sh
     brew install node
     ```
   - Verify installation:
     ```sh
     node -v
     npm -v
     ```

3. **Install Git:**
   - In the **Terminal**, type:
     ```sh
     brew install git
     ```
   - Verify installation:
     ```sh
     git --version
     ```

### Linux (Ubuntu/Debian-based distros)
1. **Update system packages:**
   - Open the **Terminal** (usually found in Applications > Utilities).
   - Run the following command:
     ```sh
     sudo apt update && sudo apt upgrade -y
     ```

2. **Install Node.js:**
   - Run these commands in the **Terminal**:
     ```sh
     curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
     sudo apt install -y nodejs
     ```
   - Verify installation:
     ```sh
     node -v
     npm -v
     ```

3. **Install Git:**
   - Run the following command in the **Terminal**:
     ```sh
     sudo apt install git
     ```
   - Verify installation:
     ```sh
     git --version
     ```

## Installation Instructions

### 1. Open a Terminal or Command Prompt
- **Windows:** Open the **Command Prompt** (search for `cmd` in the Start Menu).
- **MacOS & Linux:** Open the **Terminal** (search for it in Spotlight or Applications > Utilities).

### 2. Clone the repository
   - Copy and paste the following command:
     ```sh
     git clone https://github.com/CMPT-276-SPRING-2025/final-project-08-oceans.git
     cd final-project-08-oceans
     ```

### 3. Install dependencies
   - In the same terminal window, run:
     ```sh
     npm install
     ```

### 4. Set up environment variables
   - Inside the project folder, create a file named `.env`.
   - For Petfinder, you will need a key and a secret, which can be aquired [here](https://www.petfinder.com/developers/).
   - For Mapbox, you will need a token, which can be aquired [here](https://www.mapbox.com/).
   - Copy and paste the items below into the .env file, replacing KEY and SECRET with the keys and secret you aquired from above (remove <> as well).
     ```sh
     PETFINDER_KEY = <KEY>
     PETFINDER_SECRET = <SECRET>
     MAPBOX_KEY = <KEY>
     ```

### 5. Run the development server
   - In the terminal, run:
     ```sh
     npm run dev
     ```

### 6. Open in browser
   - Open a web browser and go to:
     ```
     http://localhost:3000
     ```
   - The website should now be running locally.

## Additional Notes
- If you encounter permission errors on Linux while trying to run either npm install or npm run dev, you may need to run:
  ```sh
  sudo chown -R $USER:$USER .
  ```
  inside the project directory first, this will give you full control over the files and should fix the permission error.

