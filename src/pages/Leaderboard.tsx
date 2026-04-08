import { motion } from "framer-motion";
import { useState } from "react";
import { Trophy, Flame, Medal } from "lucide-react";
import { leaderboardData } from "@/data/mockData";
import BottomNav from "@/components/BottomNav";

const Leaderboard = () => {
  const [filter, setFilter] = useState<"weekly" | "alltime">("weekly");
  const top3 = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);

  const medalColors = ["text-primary", "text-muted-foreground", "text-streak"];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-6 pb-12 pt-10 rounded-b-[2rem]">
        <h1 className="text-xl font-bold text-foreground text-center">লিডারবোর্ড</h1>
        <div className="mt-4 flex justify-center gap-2">
          {(["weekly", "alltime"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-foreground/10 text-foreground/70 border border-foreground/10"
              }`}
            >
              {f === "weekly" ? "সাপ্তাহিক" : "সর্বকালীন"}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="mt-6 flex items-end justify-center gap-3">
          {[top3[1], top3[0], top3[2]].map((user, i) => {
            const heights = ["h-20", "h-28", "h-16"];
            const sizes = ["text-base", "text-lg", "text-base"];
            return (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 border border-foreground/15">
                  <Medal size={20} className={medalColors[user.rank - 1]} />
                </div>
                <p className="text-xs text-foreground font-medium truncate max-w-[80px]">{user.name}</p>
                <div className={`mt-1 w-16 ${heights[i]} rounded-t-xl bg-foreground/8 flex items-center justify-center border-t border-x border-foreground/10`}>
                  <div className="text-center">
                    <p className={`${sizes[i]} font-bold text-foreground`}>{user.streak}</p>
                    <Flame size={12} className="mx-auto text-primary" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Rest */}
      <div className="px-5 -mt-4 space-y-2">
        {rest.map((user, i) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className={`flex items-center gap-3 rounded-2xl border p-3.5 ${
              user.isUser ? "border-primary/50 bg-accent" : "border-border/50 bg-card"
            }`}
          >
            <span className="w-6 text-center text-sm font-bold text-muted-foreground">#{user.rank}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
              <span className="text-xs font-bold text-muted-foreground">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${user.isUser ? "text-primary" : "text-foreground"}`}>
                {user.name} {user.isUser && "⭐"}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Flame size={14} className="text-primary" />
              <span className="font-semibold text-foreground">{user.streak}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Leaderboard;
