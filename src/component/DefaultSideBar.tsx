import { HiChartPie, HiDocument } from 'react-icons/hi';
import { IoIosLogOut } from 'react-icons/io';
import { Avatar, Sidebar } from 'flowbite-react';

import { useRouter } from 'next/router';
import Link from 'next/link';

export type DefaultSideBarProps = {
  user: User;
};

export default function DefaultSideBar({ user }: DefaultSideBarProps) {
  const router = useRouter();

  return (
    <>
      <div className="h-full">
        {/* Avatar */}
        <div className="justify-start p-10">
          <div className="mt-4">
            <Avatar rounded size="lg" placeholderInitials="BP" />
          </div>
          <div className="mt-4 font-bold text-lg">{user.username}</div>
          <div className="mt-2 font-bold text-base text-gray-500">
            <span>
              {/* 부서 */}
              {user.department}
            </span>
            {' - '}
            <span>
              {/* 직급 */}
              {user.position}
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
                <Sidebar.Collapse icon={HiDocument} label="결제 문서" open>
                  <Sidebar.Item
                    as="p"
                    active={router.pathname == '/document/search'}
                  >
                    <Link className="block w-full" href="/document/search">
                      결제 문서 목록
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
                  <Sidebar.Item icon={IoIosLogOut}>로그아웃</Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        </div>
      </div>
    </>
  );
}
