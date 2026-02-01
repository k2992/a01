export const About = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-12 py-10">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
        <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-neutral-300">System_Definition</h2>
      </div>

      <div className="space-y-10 text-xs text-neutral-500 leading-relaxed uppercase tracking-wider font-bold">
        <section className="space-y-4 p-6 border border-neutral-900 bg-neutral-900/20 rounded-xl">
          <h3 className="text-neutral-400 font-bold border-l-2 border-accent pl-3">Scope</h3>
          <p>
            MetaLab Office is a restricted-access telemetry and management interface. 
            Its primary function is to coordinate distributed infrastructure nodes and service health monitors.
          </p>
        </section>

        <section className="space-y-4 p-6 border border-neutral-900 bg-neutral-900/20 rounded-xl">
          <h3 className="text-neutral-400 font-bold border-l-2 border-accent pl-3">Requirements</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Valid Tier-01 authentication sequence</li>
            <li>Synchronized internal UTC clock</li>
            <li>Authorized IP range verification</li>
            <li>Active node heartbeat signal</li>
          </ul>
        </section>

        <section className="pt-8 text-center">
          <p className="italic text-neutral-700 text-[10px] tracking-tight border-t border-neutral-900 pt-6">
            All operator actions are logged in the persistent telemetry stream. 
            Access implies acceptance of terminal protocols and safety locks.
          </p>
        </section>
      </div>
    </div>
  );
};