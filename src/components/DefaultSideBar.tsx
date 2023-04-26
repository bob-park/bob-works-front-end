import { HiChartPie, HiDocument } from 'react-icons/hi';
import { IoIosLogOut } from 'react-icons/io';
import { Avatar, Sidebar } from 'flowbite-react';

import { useRouter } from 'next/router';
import Link from 'next/link';

export type DefaultSideBarProps = {
  user: User;
  onLogout?: () => void;
};

export default function DefaultSideBar({
  user,
  onLogout,
}: DefaultSideBarProps) {
  const router = useRouter();

  const handleLogout = () => {
    onLogout && onLogout();
  };

  return (
    <>
      <div className="h-full">
        {/* Avatar */}
        <div className="justify-start p-10">
          <div className="mt-4">
            <Avatar rounded size="lg" placeholderInitials="BP" />
          </div>
          <div className="mt-4 font-bold text-lg">{user.name}</div>
          <div className="mt-2 font-bold text-base text-gray-500">
            <span>
              {/* 부서 */}
              {'dummy'}
            </span>
            {' - '}
            <span>
              {/* 직급 */}
              {user.position?.name}
            </span>
          </div>
        </div>
        {/* sidebar */}
        <div className="h-auto">
          <Sidebar aria-label="Sidebar with content separator example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  icon={HiChartPie}
                  as="div"
                  active={router.pathname == '/'}
                >
                  <Link className="block w-full" href="/">
                    대시보드
                  </Link>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Collapse icon={HiDocument} label="결제" open>
                  <Sidebar.Item
                    as="p"
                    active={router.pathname == '/document/search'}
                  >
                    <Link className="block w-full" href="/document/search">
                      문서 목록
                    </Link>
                  </Sidebar.Item>
                  <Sidebar.Item
                    as="p"
                    active={router.pathname == '/document/approve/list'}
                  >
                    <Link
                      className="block w-full"
                      href="/document/approve/list"
                    >
                      결제 필요 목록
                    </Link>
                  </Sidebar.Item>
                  <Sidebar.Item
                    as="p"
                    active={router.pathname == '/document/vacation/request'}
                  >
                    <Link
                      className="block w-full"
                      href="/document/vacation/request"
                    >
                      휴가 신청
                    </Link>
                  </Sidebar.Item>
                </Sidebar.Collapse>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
      </div>
      <div>
        <div className="relative w-full">
          <div className="absolute w-full" style={{ bottom: '30px' }}>
            <Sidebar aria-label="Sidebar with content separator example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item icon={IoIosLogOut}>
                    <Link className="block w-full" href="/api/logout">
                      로그아웃
                    </Link>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        </div>
      </div>
    </>
  );
}
