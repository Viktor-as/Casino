type EurovisionWinRateBarProps = {
  winRatePercentage: number;
};

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

function EurovisionWinRateBar({ winRatePercentage }: EurovisionWinRateBarProps) {
  const pct = clampPercent(winRatePercentage);

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-end text-[0.625rem] leading-[0.9375rem] text-text-grey">
        <span>{winRatePercentage.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default EurovisionWinRateBar;
