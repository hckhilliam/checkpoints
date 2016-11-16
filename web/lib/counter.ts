export default function* counter() {
  let counter = 0;
  for ( ;; )
    yield ++counter;
}
