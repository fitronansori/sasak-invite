import { TERMS_OF_SERVICE } from "@/constants/data";

const TermPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Ketentuan Layanan
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
            Selamat datang di Sasak Invite. Ketentuan layanan ini mengatur
            penggunaan layanan pembuatan undangan digital kami. Mohon baca
            dengan seksama sebelum menggunakan layanan kami.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {TERMS_OF_SERVICE.map((section, index) => (
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
            Dengan menggunakan layanan Sasak Invite, Anda menyatakan telah
            membaca, memahami, dan menyetujui semua ketentuan layanan di atas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermPage;
