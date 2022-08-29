import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border: none;
  margin: 5px;
  border-radius: 3px;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
