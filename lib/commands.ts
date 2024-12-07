export const commands = {
  help: 'Shows available commands',
  clear: 'Clears the terminal',
  exit: 'Exits the terminal',
  chat: 'Start chatting with ZIMA AI',
  about: 'Learn more about ZIMA',
  theme: 'Toggle terminal theme',
  contract: 'Show the ZIMA token contract address',
}

export type Command = keyof typeof commands

