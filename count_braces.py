with open('client.js', 'r', encoding='utf-8') as f:
    text = f.read()

open_count = 0
close_count = 0
stack = []
for i, char in enumerate(text):
    if char == '{':
        open_count += 1
        stack.append(i)
    elif char == '}':
        close_count += 1
        if stack:
            stack.pop()
        else:
            print(f"Extra closing brace at index {i}")

print(f"Total open: {open_count}")
print(f"Total close: {close_count}")
if stack:
    print(f"Unclosed braces at indices: {stack}")
