{pkgs}: {
  channel = "stable-24.05";
  
  # Install required packages including pnpm
  packages = [
    pkgs.nodejs_20
    pkgs.pnpm
  ];
  
  # Set up environment variables
  env = {
    # Ensure pnpm is available in PATH
    PATH = [ "${pkgs.pnpm}/bin" ];
    
    # Next.js environment variables
    NODE_ENV = "development";
    NEXT_TELEMETRY_DISABLED = "1";
  };
  
  # Install VS Code extensions for better development experience
  idx.extensions = [
    "bradlc.vscode-tailwindcss"
    "ms-vscode.vscode-typescript-next"
    "esbenp.prettier-vscode"
  ];
  
  # Configure preview settings
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "pnpm"
          "run"
          "dev"
          "--port"
          "9002"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
        env = {
          PORT = "9002";
          HOSTNAME = "0.0.0.0";
        };
      };
    };
  };
}