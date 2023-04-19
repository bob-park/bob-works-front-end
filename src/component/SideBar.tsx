import { Avatar, Label } from 'flowbite-react';

export default function Sidebar() {
  return (
    <div className="grid justify-start pl-10">
      <div className="mt-10 ">
        <Avatar rounded size="lg" placeholderInitials="BP" />
      </div>
      <div className="mt-10">Bob park</div>
      <div className="mt-1">디지털 미디어부 (대리)</div>
    </div>
  );
}
