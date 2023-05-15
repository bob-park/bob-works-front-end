import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import {
  Avatar,
  Button,
  Card,
  FileInput,
  Label,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

import { userActions } from '@/store/user';

const { requestUpdatePassword, requestUpdateAvatar } = userActions;

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
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authentication);
  const { isLoading } = useAppSelector((state) => state.user);

  const [updatePassword, setUpdatePassword] = useState<string>('');
  const [updateRepeatPassword, setUpdateRepeatPassword] = useState<string>('');
  const [isMatchPassword, setIsMatchPassword] = useState<boolean>(true);
  const [showPassword, setPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [avatarSousrce, setAvatarSource] = useState<string | undefined>(
    user?.avatar,
  );
  const [avatarFile, setAvatarFile] = useState<File>();

  // useEffect
  useLayoutEffect(() => {
    setIsMatchPassword(updatePassword === updateRepeatPassword);
  }, [updatePassword, updateRepeatPassword]);

  useEffect(() => {
    console.log(avatarFile);
  }, [avatarFile]);

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

    if (!updatePassword || !isMatchPassword) {
      return;
    }

    dispatch(
      requestUpdatePassword({
        password: updatePassword,
        handleSuccess: () => {
          setUpdatePassword('');
          setUpdateRepeatPassword('');
        },
      }),
    );
  };

  const handleChangeAvatar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (!avatarFile) {
      return;
    }

    formData.append('avatar', avatarFile);

    dispatch(
      requestUpdateAvatar({
        formData,
        handleSuccess: () => {
          router.reload();
        },
      }),
    );
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
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
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
                value={updateRepeatPassword}
                color={isMatchPassword ? 'gray' : 'failure'}
                helperText={
                  !isMatchPassword && (
                    <span className="font-medium">
                      패스워드가 서로 다릅니다.
                    </span>
                  )
                }
                onChange={(e) => setUpdateRepeatPassword(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    className="mr-2 h-5 w-5"
                    color="info"
                    aria-label="Info spinner example"
                  />
                  변경중
                </>
              ) : (
                '변경'
              )}
            </Button>
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
