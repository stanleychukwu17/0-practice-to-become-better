**ResizeObserver**
<br>
  ResizeObserver is a browser API that lets you watch an element and get notified whenever its size (width/height) changes. <br>
  Not everything triggers a window.resize event. That’s where ResizeObserver comes in It’s super useful for responsive layouts, <br>
  custom components. Once there is a change in the size of the element/component, you'll be notified. <br>

<br>

```ts
  useEffect(() => {
    const element = document.querySelector('#my-element');
    const boxes = document.querySelectorAll('.box');

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        console.log('Resized:', entry.target, entry.contentRect);
      }
    });

    // observe one element
    observer.observe(element);

    // observe multiple elements
    boxes.forEach(box => observer.observe(box));

    return () => {
      // stop observing one element
      observer.unobserve(element);

      // if observing multiple elements at once, this will stop observing all of them at once
      observer.disconnect();
    }
  })
```
- entry.target: the observed element
- entry.contentRect: an object with .width, .height, etc.
- entry.borderBoxSize, entry.contentBoxSize: more detailed box info (useful for complex cases)

## using useRef

```ts
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width } = entry.contentRect;
      setDimensions({ width, height: 300 });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);
```