import {
  AppShell,
  Navbar,
  Header,
  ScrollArea,
  Box,
  Container,
  Button,
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
} from '@mantine/core';
import { MainLinks } from './_mainLinks';
import { Brand } from './_brand';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IconLogout } from '@tabler/icons';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({children}) => {
  const history = useNavigate();
  const token = Cookies.get("token")
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    Cookies.remove("token")
    history("/");
  }

  return (
    <AppShell
      padding="md"
      navbar={
      <Navbar width={{ base: 300 }} height={'90vh'} p="xs">
        <Navbar.Section mt="xs">
        </Navbar.Section>
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
          <Box>
            <MainLinks />
          </Box>
        </Navbar.Section>
        <Navbar.Section>
          <UnstyledButton
            sx={(theme) => ({
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            })}
          >
            <Button 
              variant='white'
              styles={(theme) => ({
                root: {
                  backgroundColor: 'transparent',
                  border: 0,
                  height: 42,
                  paddingLeft: 20,
                  paddingRight: 20,
        
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                },
              })}
              onClick={handleLogout}
            >
              <Group>
                <ThemeIcon color={'blue'} variant="light">
                  <IconLogout />
                </ThemeIcon>
                
                <Text size="sm">Log out</Text>
              </Group>
            </Button>
          </UnstyledButton>
        </Navbar.Section>
      </Navbar>
      }
      header={
        <Header height={'10vh'} p="xs">
          <Brand />
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
  >
    <Container
      size='xl'
      style={{marginTop:'85px', width:'100%'}}
    >
      {children}
    </Container>
  </AppShell>
  );
}

export default Layout;