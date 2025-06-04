const teamMembers = [
  {
    name: 'Nguyễn Quang Anh',
    id: '20213564',
    email: 'anh.nq213564@sis.hust.edu.vn',
  },
  {
    name: 'Nguyễn Danh Huy',
    id: '20213571',
    email: 'huy.nd213571@sis.hust.edu.vn',
  },
  {
    name: 'Nguyễn Đỗ Hoàng Minh',
    id: '20210591',
    email: 'minh.ndh210591@sis.hust.edu.vn',
  },
  {
    name: 'Nguyễn Hữu Phong',
    id: '20210668',
    email: 'phong.nh210668@sis.hust.edu.vn',
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl w-full border border-border">
        <h1 className="text-3xl font-bold text-primary text-center mb-4">About Us</h1>
        <p className="text-text-main text-center text-base mb-6">
          We are <span className="font-semibold">Group 6</span> from the Web and App Programming course at <span className="font-semibold">HUST</span>. Meet our team:
        </p>

        <ul className="divide-y divide-border">
          {teamMembers.map((member, index) => (
            <li key={index} className="py-4 px-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-text-main font-medium">{member.name}</span>
                <span className="text-text-muted text-sm">{member.id}</span>
              </div>
              <a
                href={`mailto:${member.email}`}
                className="text-sm text-primary hover:underline block"
              >
                {member.email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;