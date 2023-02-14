import { showNotification } from "@mantine/notifications"

export const Toast = (message: string, isError: boolean) => {
  showNotification({
    title: isError ? 'Error' : 'Success',
    message: message,
    styles: (theme) => ({
      root: {
        backgroundColor: isError ? theme.colors.red[6] : theme.colors.green[6],
        borderColor: isError ? theme.colors.red[6] : theme.colors.green[6],
        '&::before': { backgroundColor: theme.white },
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: isError ? theme.colors.red[7] : theme.colors.green[7] },
      },
    }),
  })
}