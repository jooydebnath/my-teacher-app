import { motion } from "framer-motion";
import { Trophy, Flame, Medal, Crown, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const leaderboardUsers = [
  { rank: 1, name: "আরিফ হোসেন", class: "১০ম", streak: 45, score: 2850, avatar: "আ" },
  { rank: 2, name: "ফাতিমা আক্তার", class: "৯ম", streak: 38, score: 2720, avatar: "ফা" },
  { rank: 3, name: "রাহাত খান", class: "১১শ", streak: 35, score: 2680, avatar: "রা" },
  { rank: 4, name: "নুসরাত জাহান", class: "৮ম", streak: 32, score: 2450, avatar: "নু" },
  { rank: 5, name: "তানভীর আহমেদ", class: "১০ম", streak: 30, score: 2380, avatar: "তা" },
  { rank: 6, name: "সাবরিনা ইসলাম", class: "৭ম", streak: 28, score: 2200, avatar: "সা" },
  { rank: 7, name: "মাহমুদ হাসান", class: "১২শ", streak: 25, score: 2100, avatar: "মা" },
  { rank: 8, name: "রিমা বেগম", class: "৬ষ্ঠ", streak: 22, score: 1950, avatar: "রি" },
  { rank: 9, name: "কামরুল ইসলাম", class: "৯ম", streak: 20, score: 1800, avatar: "কা" },
  { rank: 10, name: "জান্নাতুল ফেরদৌস", class: "১০ম", streak: 18, score: 1720, avatar: "জা" },
];

const weeklyUsers = [
  { rank: 1, name: "ফাতিমা আক্তার", class: "৯ম", streak: 7, score: 480, avatar: "ফা" },
  { rank: 2, name: "তানভীর আহমেদ", class: "১০ম", streak: 7, score: 450, avatar: "তা" },
  { rank: 3, name: "আরিফ হোসেন", class: "১০ম", streak: 6, score: 420, avatar: "আ" },
  { rank: 4, name: "নুসরাত জাহান", class: "৮ম", streak: 5, score: 380, avatar: "নু" },
  { rank: 5, name: "সাবরিনা ইসলাম", class: "৭ম", streak: 5, score: 350, avatar: "সা" },
  { rank: 6, name: "রাহাত খান", class: "১১শ", streak: 4, score: 320, avatar: "রা" },
  { rank: 7, name: "মাহমুদ হাসান", class: "১২শ", streak: 4, score: 290, avatar: "মা" },
  { rank: 8, name: "রিমা বেগম", class: "৬ষ্ঠ", streak: 3, score: 250, avatar: "রি" },
];

const podiumColors = [
  "from-yellow-400/20 to-yellow-500/5 border-yellow-400/40",
  "from-slate-300/20 to-slate-400/5 border-slate-400/40",
  "from-amber-600/20 to-amber-700/5 border-amber-600/40",
];
const podiumIcons = [Crown, Medal, Medal];

const LeaderboardTable = ({ data }: { data: typeof leaderboardUsers }) => {
  const [search, setSearch] = useState("");
  const filtered = data.filter((u) => u.name.includes(search));

  return (
    <div className="space-y-4">
      {/* Top 3 podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {data.slice(0, 3).map((user, i) => {
          const Icon = podiumIcons[i];
          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border bg-gradient-to-b p-5 text-center ${podiumColors[i]}`}
            >
              <Icon
                size={24}
                className={i === 0 ? "text-yellow-500 mx-auto mb-2" : i === 1 ? "text-slate-400 mx-auto mb-2" : "text-amber-600 mx-auto mb-2"}
              />
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 border-2 border-primary/30 mx-auto mb-2">
                <span className="text-lg font-bold text-primary">{user.avatar}</span>
              </div>
              <p className="text-sm font-bold text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.class} শ্রেণি</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Flame size={14} className="text-primary" />
                <span className="text-xs font-semibold text-foreground">{user.streak} দিন</span>
              </div>
              <p className="text-lg font-bold text-primary mt-1">{user.score} pts</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 border border-border/50 max-w-sm">
        <Search size={14} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="শিক্ষার্থী খুঁজুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">র‍্যাংক</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">নাম</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">ক্লাস</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">স্ট্রিক</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">স্কোর</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <motion.tr
                key={user.rank}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/30 hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold ${user.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                    #{user.rank}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15">
                      <span className="text-xs font-bold text-primary">{user.avatar}</span>
                    </div>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{user.class}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Flame size={12} className="text-primary" />
                    <span className="font-semibold text-foreground">{user.streak}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">{user.score}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardLeaderboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
          <Trophy size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">লিডারবোর্ড</h1>
          <p className="text-sm text-muted-foreground">শীর্ষ শিক্ষার্থীদের র‍্যাংকিং</p>
        </div>
      </div>

      <Tabs defaultValue="alltime">
        <TabsList className="bg-muted/50 border border-border/50">
          <TabsTrigger value="alltime">সর্বকালীন</TabsTrigger>
          <TabsTrigger value="weekly">এই সপ্তাহ</TabsTrigger>
        </TabsList>
        <TabsContent value="alltime">
          <LeaderboardTable data={leaderboardUsers} />
        </TabsContent>
        <TabsContent value="weekly">
          <LeaderboardTable data={weeklyUsers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardLeaderboard;
