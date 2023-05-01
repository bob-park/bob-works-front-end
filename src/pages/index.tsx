import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { Card } from 'flowbite-react';

import { userActions } from '@/store/user';

const { requestGetUserVacation } = userActions;

export default function Home() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const general = user?.nowVacation?.general || { totalCount: 0, usedCount: 0 };
  const alternative = user?.nowVacation?.alternative || {
    totalCount: 0,
    usedCount: 0,
  };

  useEffect(() => {
    dispatch(requestGetUserVacation());
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          최근 결제 문서
        </h5>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    대기 중
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  12
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    승인
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  2
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    반려
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  3
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
      <Card>
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          휴가 정보
        </h5>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    총 수
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {general.totalCount}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    사용한 수
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {general.usedCount}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    남은 수
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {general.totalCount - general.usedCount}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
      <Card>
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          대체휴가 정보
        </h5>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    총 수
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {alternative.totalCount}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    사용한 수
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {alternative.usedCount}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    남은 수
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {alternative.totalCount - alternative.usedCount}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
