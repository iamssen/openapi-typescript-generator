describe('???', () => {
  test('fetch', async () => {
    const response = await fetch(``);
    const reader = response.body?.getReader();

    if (reader) {
      const contentLength = +(response.headers.get('Content-Length') ?? 0);

      while (true) {
        const { done, value } = await reader.read();
        console.log('test.ts..()');

        if (done) {
          break;
        }
      }
    }
  });

  test('Object', () => {
    const x = {
      a: {
        o: 1,
        p: 2,
      },
      b: 2,
      c: {
        x: 1,
        y: 2,
        z: {
          q: 1,
          w: 2,
        },
      },
    };

    const str = JSON.stringify(
      x,
      (key, value) => {
        switch (key) {
          //case 'a':
          //  return value + 'aaaa';
          //case 'b':
          //  return value + 'bbbb';
          //case 'c':
          //  return value + 'cccc';
          default:
            return value;
        }
      },
      2,
    );

    console.log('test.ts..()', str);
  });
});
