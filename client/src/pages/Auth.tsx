import { useRouter } from '@happysanta/router';
import {
  Button,
  ButtonGroup,
  Checkbox,
  DateInput,
  FormItem,
  FormLayout,
  Input,
  Link,
  Panel,
  PanelHeader,
  Title,
} from '@vkontakte/vkui';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { PAGE_LOGIN } from '../routes';
import { PanelIDProps } from '../types/Panel';
import { REG_EMAIL, REG_PASS } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { registerUser } from '../store/reducers/Auth/AuthActionCreators';
import { IUser } from '../types/modals/IUser';

const Auth = (props: PanelIDProps) => {
  const router = useRouter();

  const { isLoading, error } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [username, setUserName] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [isEmail, setIsEmail] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [date, setDate] = useState<Date>(() => new Date());

  useEffect(() => {
    setIsPassword(REG_PASS.test(password));
  }, [password]);

  useEffect(() => {
    setIsEmail(REG_EMAIL.test(email));
  }, [email]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const setStateAction = {
      username: setUserName,
      email: setEmail,
      name: setName,
      lastname: setLastName,
      password: setPassword,
      confirmPassword: setConfirmPassword,
    }[name];

    setStateAction && setStateAction(value);
  };

  const register = () => {
    const user: IUser = {
      email: email,
      username: username,
      name: name,
      lastname: lastName,
      password: password,
      birthday: date,
    };
    dispatch(registerUser(user));
  };
  return (
    <Panel id={props.id}>
      <PanelHeader> Регистрация</PanelHeader>
      <FormLayout>
        {error && <Title> {error}</Title>}
        <FormItem
          bottom="Длина должна быть больше 3 символов"
          top="username"
          status={
            username.length === 0
              ? 'default'
              : username.length >= 3
              ? 'valid'
              : 'error'
          }
        >
          <Input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
          />
        </FormItem>
        <FormItem
          bottom="Длина должна быть больше 3 символов"
          top="Имя"
          status={
            name.length === 0 ? 'default' : name.length >= 3 ? 'valid' : 'error'
          }
        >
          <Input type="text" name="name" value={name} onChange={onChange} />
        </FormItem>
        <FormItem
          bottom="Длина должна быть больше 3 символов"
          top="Фамилия"
          status={
            lastName.length === 0
              ? 'default'
              : lastName.length >= 3
              ? 'valid'
              : 'error'
          }
        >
          <Input
            type="text"
            name="lastname"
            value={lastName}
            onChange={onChange}
          />
        </FormItem>
        <FormItem
          top="E-mail"
          status={isEmail ? 'valid' : 'error'}
          bottom={
            isEmail
              ? 'Электронная почта введена верно!'
              : 'Пожалуйста, введите электронную почту'
          }
        >
          <Input type="email" name="email" value={email} onChange={onChange} />
        </FormItem>

        <FormItem
          top="Пароль"
          status={isPassword ? 'valid' : 'error'}
          bottom={
            isPassword
              ? ''
              : 'Пароль может содержать только латинские буквы и цифры.'
          }
        >
          <Input
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={password}
            onChange={onChange}
          />
        </FormItem>

        <FormItem
          bottom={
            password === confirmPassword
              ? 'Пароли совпадают'
              : 'Пароли не совпадают'
          }
        >
          <Input
            status={
              confirmPassword === ''
                ? 'default'
                : password === confirmPassword
                ? 'valid'
                : 'error'
            }
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={onChange}
          />
        </FormItem>
        <FormItem top="Дата рождения">
          <DateInput value={date} onChange={(e: Date) => setDate(e)} />
        </FormItem>

        <Checkbox>
          Согласен со всем <Link>этим</Link>
        </Checkbox>
        <FormItem>
          <ButtonGroup mode="horizontal" gap="m" stretched>
            <Button onClick={register} loading={isLoading} size="l" stretched>
              Регистрация
            </Button>
            <Button
              size="l"
              mode="secondary"
              onClick={() => {
                router.pushPage(PAGE_LOGIN);
              }}
            >
              Есть аккаунт
            </Button>
          </ButtonGroup>
        </FormItem>
      </FormLayout>
    </Panel>
  );
};

export default Auth;
