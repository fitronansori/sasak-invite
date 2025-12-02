import { PRIVACY_POLICY } from "@/constants/data";

const PrivacyPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Kebijakan Privasi
          </h1>
          <p className="text-muted-foreground">
            Terakhir diperbarui:{" "}
            {new Date().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-gray max-w-none">
          <p className="text-lg">
            Di Sasak Invite, kami menghormati privasi Anda dan berkomitmen untuk
            melindungi informasi pribadi Anda. Kebijakan privasi ini menjelaskan
            bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda
            saat menggunakan layanan kami.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {PRIVACY_POLICY.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-muted-foreground leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t pt-8">
          <p className="text-muted-foreground text-sm">
            Privasi Anda penting bagi kami. Jika Anda memiliki pertanyaan atau
            kekhawatiran tentang kebijakan privasi ini, jangan ragu untuk
            menghubungi kami.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
