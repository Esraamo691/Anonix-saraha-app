import logoImg from "../../assets/images/logo.png";
export default function LogoImg() {
  return (
    <>
      <div className="w-12 h-12 bg-[rgba(0,27,136,0.19)] rounded-full flex items-center justify-center">
        <img
          src={logoImg}
          alt="Kudo Logo"
          className="w-10 h-10 object-contain"
        />
      </div>
    </>
  );
}
