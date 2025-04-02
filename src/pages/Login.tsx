
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating login API call
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        localStorage.setItem("user", JSON.stringify({ username, role: "admin" }));
        toast({
          title: "Login successful",
          description: "Welcome to the CMMS dashboard.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-800 to-navy-950">
      <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1652424158445-7d97fa67b6a6?q=80&w=1664&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"></div>
      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-2">Naval Fleet Maintenance Management</h1>
          <p className="text-navy-100">Comprehensive Maintenance and Management System</p>
        </div>

        <Card className="w-full max-w-md bg-white/95 backdrop-blur animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl text-navy-900">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-navy-200"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-navy-600 hover:text-navy-800">
                    Forgot Password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-navy-200"
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-navy-600 hover:bg-navy-700" 
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center text-navy-200 text-sm">
          <p>Department of Naval Operations • CMMS Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
