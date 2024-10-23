# MaskSelect2

**MaskSelect2** is a jQuery plugin that applies mask patterns to Select2 elements, allowing tag creation only when the mask is fully completed. This is useful in scenarios where formatted inputs are required, such as CPF, CNPJ, phone numbers, etc.

## License

MIT License - Copyright 2024 Deivid Hugo

## Installation

To use **MaskSelect2**, make sure you have jQuery and Select2 included in your project. You can add the plugin to your project as follows:

1. Include the necessary dependencies in your HTML:

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
<script src="path/to/your/maskSelect2.js"></script>
```

2. After including the plugin file, you can use it on your Select2 elements.

## Usage

The **MaskSelect2** plugin is used as a jQuery method that applies a mask to Select2 elements.

### Syntax

```javascript
$(your_selector).maskSelect2(maskPattern, enableTagCreationWhenMaskComplete);
```

#### Parameters

- **maskPattern**: A string that represents the mask pattern to be applied (e.g., `"(99) 9999-9999"`).
- **enableTagCreationWhenMaskComplete**: A boolean indicating whether tag creation should be enforced only when the mask is fully completed. The default is `false`.

### Example Usage

```html
<select id="my-select" data-tags="true" multiple>
</select>

<script>
$(document).ready(function() {
    $('#my-select').select2(); // Initialize Select2
    $('#my-select').maskSelect2('(99) 9999-9999', true); // Apply mask and enable tag creation
});
</script>
```

### Use Cases

#### 1. Create Tags Only with Complete Mask

```javascript
$('#my-select').select2({tags: true,}); // Initialize Select2
$('#my-select').maskSelect2('(99) 9999-9999', true);
```

In this case, tag creation will only be allowed if the user enters a value that fully matches the specified mask pattern. If the user tries to create a tag with less than 14 characters, the tag will not be created. Additionally, make sure that the tags option is enabled for the Select2 component, otherwise, the mask will still apply, but tag creation will not function as intended.

#### 2. Create Tags with Mask Applied but Incomplete Input

```javascript
$('#my-select').select2(); // Initialize Select2
$('#my-select').maskSelect2('(99) 9999-9999', false);
```

Here, tag creation will be allowed regardless of whether the input matches the complete mask. The default false allows the user to create tags with any string, even if it is incomplete. The mask will still be applied during input, but tags can be created with partial entries (e.g., (99) 9999-9 instead of (99) 9999-9999). Again, ensure that the tags option is enabled for the Select2 component for tag creation to work.

#### 3. Only Use Options Without Tag Creation

```javascript
$('#my-select').select2(); // Initialize Select2
$('#my-select').maskSelect2('(99) 9999-9999');
```

In this scenario, the mask will only be applied to the search input, allowing users to type their queries while following the mask format. Since the tags option is not set to true in the Select2 configuration, users cannot create new tags; they can only select from the available options. The mask will aid in formatting searches, ensuring consistency in input, but will not permit tag creation.

### Warnings and Messages

- If **enableTagCreationWhenMaskComplete** is `true` and the tags option is disabled in Select2, a warning message will appear in the console:

```plaintext
EnableTagCreationWhenMaskComplete is true, but the tags option is disabled. Please enable tags to use this feature.
```

- If Select2 is not activated on the element, a warning message will appear:

```plaintext
Select2 is not activated on this element with ID "my-select".
```

## Contribution

If you would like to contribute to **MaskSelect2**, feel free to fork the repository and submit pull requests. Suggestions and feedback are always welcome!

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contributing

Contributions are welcome! Please submit issues or pull requests on [GitHub](https://github.com/DeividHugo/mask-select2).

## Author

- **Deivid Hugo** - [GitHub Profile](https://github.com/DeividHugo)