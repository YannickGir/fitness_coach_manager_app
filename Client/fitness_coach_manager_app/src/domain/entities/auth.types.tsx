export type Profile = {
    username:string;
    id: number;
    email: string;
    password_hash:string; 
    created_at:Date;
    };

export type SignInFormProps = {
    onSignIn: (username: string, password: string, email: string) => void;
    };

export type SignUpFormProps = {
    onSignUp: (username: string, password: string, email: string) => void;
    };

export type CustomPopupProps = {
  message: string; // Spécifiez le type de message
  onClose: () => void;
}
    
   