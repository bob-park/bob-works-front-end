import { useLayoutEffect, useState } from 'react';
import { HiChartPie, HiDocument } from 'react-icons/hi';
import { IoIosLogOut } from 'react-icons/io';
import { Avatar, Label, Sidebar, Button } from 'flowbite-react';

import Link from 'next/link';

export default function DefaultSideBar() {
  return (
    <>
      <div className="h-full">
        {/* Avatar */}
        <div className="justify-start p-10">
          <div className="mt-4">
            <Avatar rounded size="lg" placeholderInitials="BP" />
          </div>
          <div className="mt-4 font-bold text-lg">Bob park</div>
          <div className="mt-2 font-bold text-base text-gray">
            <span>
              {/* 부서 */}
              디지털 미디어부
            </span>
            {' - '}
            <span>
              {/* 직급 */}
              대리
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
                  active={location.pathname == '/'}
                  as="div"
                >
                  <Link href="/" className="w-full">
                    대시보드
                  </Link>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Collapse icon={HiDocument} label="결제 문서" open>
                  <Sidebar.Item
                    as="p"
                    active={location.pathname == '/document/search'}
                  >
                    <Link href="/document/search">결제 문서 목록</Link>
                  </Sidebar.Item>
                  <Sidebar.Item
                    as="p"
                    active={location.pathname == '/document/vacation/request'}
                  >
                    <Link href="/document/vacation/request">휴가계 신청</Link>
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
                  <Sidebar.Item href="#" icon={IoIosLogOut}>
                    로그아웃
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
