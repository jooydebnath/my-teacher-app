import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Lock, Eye, EyeOff, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isDashboardLoggedIn", "true");
      navigate("/dashboard", { replace: true });
      setLoading(false);
    }, 800);
  };

  const handleGoogleSignIn = () => {
    localStorage.setItem("isDashboardLoggedIn", "true");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left decorative panel — desktop only */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-12"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl gradient-amber mx-auto mb-6 shadow-xl">
            <BookOpen size={36} className="text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">My Teacher</h2>
          <p className="text-lg text-muted-foreground">অ্যাডমিন ড্যাশবোর্ড</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            শিক্ষার্থী, কন্টেন্ট ও সাবস্ক্রিপশন ম্যানেজ করুন
          </p>
        </motion.div>
      </div>

      {/* Right login form */}
      <div className="flex flex-1 items-center justify-center px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-amber">
              <BookOpen size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">My Teacher</h1>
              <p className="text-xs text-muted-foreground">অ্যাডমিন ড্যাশবোর্ড</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-1 hidden lg:block">ড্যাশবোর্ড লগইন</h1>
          <p className="text-sm text-muted-foreground mb-8">অ্যাডমিন অ্যাকাউন্টে প্রবেশ করুন</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                placeholder="ফোন নম্বর"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-border bg-card pl-10 pr-11 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="text-right">
              <button type="button" className="text-xs text-primary font-medium hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading || !phone || !password}
              className="w-full rounded-2xl py-6 text-base font-semibold gradient-amber text-primary-foreground shadow-lg gap-2"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
                />
              ) : (
                <>লগইন করুন <ArrowRight size={18} /></>
              )}
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">অথবা</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card py-3.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Google দিয়ে লগইন
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLogin;
