type WinProbabilityBarProps = {
  team1WinRate: number;
  team2WinRate: number;
};

function WinProbabilityBar({ team1WinRate, team2WinRate }: WinProbabilityBarProps) {
  const total = team1WinRate + team2WinRate;
  const team1Percent = total > 0 ? (team1WinRate / total) * 100 : 50;
  const team2Percent = total > 0 ? (team2WinRate / total) * 100 : 50;

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full bg-secondary" style={{ width: `${team1Percent}%` }} />
        <div className="h-full bg-primary" style={{ width: `${team2Percent}%` }} />
      </div>
      <div className="flex justify-between text-[0.625rem] leading-[0.9375rem] text-text-grey">
        <span>{team1WinRate.toFixed(1)}%</span>
        <span>{team2WinRate.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default WinProbabilityBar;
