import { ChangeEvent, FormEvent, useLayoutEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import {
  Avatar,
  Button,
  Card,
  FileInput,
  Label,
  TextInput,
} from 'flowbite-react';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

type PasswordVisibleToggleProps = {
  toggle: boolean;
  onToggle: (toggle: boolean) => void;
};

const PasswordVisibleToggle = ({
  toggle,
  onToggle,
}: PasswordVisibleToggleProps) => {
  const handleToggle = () => {
    onToggle && onToggle(!toggle);
  };

  return (
    <div onClick={handleToggle}>
      {toggle ? (
        <AiFillEyeInvisible className="w-6 h-6" />
      ) : (
        <AiFillEye className="w-6 h-6" />
      )}
    </div>
  );
};

export default function Settings() {
  const { isLoading, user } = useAppSelector((state) => state.authentication);

  const [showPassword, setPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [avatarSousrce, setAvatarSource] = useState<string | undefined>(
    user?.avatar,
  );
  const [avatarFile, setAvatarFile] = useState<File>();

  const handleChangeAvatarFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }
    const file = files[0];
    setAvatarSource(URL.createObjectURL(file));
    setAvatarFile(file);
  };

  const handleChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChangeAvatar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      <p className="text-2xl font-bold">설정</p>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            패스워드 변경
          </h5>
          <form
            className="flex flex-col gap-10 m-3 h-full"
            onSubmit={handleChangePassword}
          >
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="password" value="변경할 패스워드" />
              </div>
              <TextInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                addon={
                  <PasswordVisibleToggle
                    toggle={showPassword}
                    onToggle={(toggle) => setPassword(toggle)}
                  />
                }
                placeholder="password"
                required={true}
              />
            </div>

            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="repeatPassword" value="패스워드 확인" />
              </div>
              <TextInput
                id="repeatPassword"
                type={showRepeatPassword ? 'text' : 'password'}
                placeholder="repeat password"
                required={true}
                addon={
                  <PasswordVisibleToggle
                    toggle={showRepeatPassword}
                    onToggle={(toggle) => setShowRepeatPassword(toggle)}
                  />
                }
              />
            </div>
            <Button type="submit">변경</Button>
          </form>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            아바타 설정
          </h5>

          <form
            className="flex flex-col gap-6 m-3"
            onSubmit={handleChangeAvatar}
          >
            <div>
              <Avatar
                rounded
                bordered
                size="xl"
                img={avatarSousrce}
                placeholderInitials={user?.name}
              />

              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label htmlFor="avatar" value="프로필 사진" />
                </div>
                <FileInput
                  id="avatar"
                  helperText="프로필의 사진을 업로드해주세요. (jpg, png 파일만 업로드 가능합니다.)"
                  accept=".jpg, .png"
                  required
                  onChange={handleChangeAvatarFile}
                />
              </div>
            </div>

            <Button type="submit">변경</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
