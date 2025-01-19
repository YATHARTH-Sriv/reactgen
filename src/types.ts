export interface FileContent {
    [path: string]: string;
  }
  
  export interface FormData {
    prompt: string;
    uiLibrary: string;
    sections: string[];
  }
  
  export interface VSCodeInterfaceProps {
    files: FileContent;
    onSave: (files: FileContent) => Promise<void>;
    onDeploy: (files: FileContent) => Promise<void>;
  }
  
  export interface FileTreeItem {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileTreeItem[];
  }
  
  export interface EditorTab {
    path: string;
    content: string;
    isDirty: boolean;
  }
  
  export interface TerminalCommand {
    command: string;
    description: string;
    action: (args: string[]) => Promise<void>;
  }
  
  export interface DeploymentConfig {
    provider: 'vercel' | 'github';
    repository?: string;
    branch?: string;
    projectName?: string;
  }
  
  export interface GitHubConfig {
    owner: string;
    repo: string;
    token: string;
  }
  
  export interface VercelConfig {
    token: string;
    teamId?: string;
    projectId?: string;
  }