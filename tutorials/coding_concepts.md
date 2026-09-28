# 4. Coding concepts without a programming language

[Tutorial index](README.md) · Next: [HTML](html.md)

Allow 45 minutes. You need paper or your learning log. None of the code in this guide runs in a browser. It is pseudocode, a way to describe steps without committing to a language's spelling rules.

## Cheatsheet

| Concept | Meaning | Geographic example |
| --- | --- | --- |
| Value | One piece of information | `12`, `"park"`, true |
| Variable | A name referring to a value | `distance` refers to 450 |
| Type | Kind of value | Number, text, Boolean |
| List / array | An ordered collection accessed by position | Three observed distances |
| Dictionary | Key-value pairs accessed by a key | A place with keys for name and distance |
| Record | Named properties about something | A place's name and distance |
| If-test | Choose a path based on a condition | Is distance at most 500? |
| Loop | Repeat steps | Check every place |
| Function | A named operation with inputs and a result | Decide whether a place is near |
| Import | Make code from another file or library available | Reuse a mapping library |
| Print | Display information for the programmer | Show the current count |

## 1. Values, variables, and assignment

Imagine counting places within walking distance. Write:

```text
SET limit TO 500
SET place_name TO "Example park"
SET distance TO 450
SET is_open TO true
```

`SET` is assignment. It stores a value under a name. It does not ask whether two values are equal. Text is in quotes; numbers can be used in arithmetic; a Boolean is true or false. `"450"` is text until a program converts it to a number. Give units in your notes or names, such as `distance_metres`.

An empty value is not automatically zero. A missing distance means we do not know it. Treating it as zero would incorrectly put the place next door.

## 2. Decisions

```text
IF distance IS MISSING
    PRINT "Distance unknown"
ELSE IF distance <= limit AND is_open
    PRINT "Possible destination"
ELSE
    PRINT "Try another place"
END IF
```

A comparison produces true or false. `<=` includes the boundary; `<` excludes it. `AND` requires both conditions. `OR` requires at least one. Predict the output for 450, 500, and 501 metres with `is_open` true, then repeat with false.

Indentation makes the branches visible to a human. A real language also has rules about punctuation and blocks.

## 3. Arrays, dictionaries, and loops

An array stores a sequence. Position matters: the first place on a walking route comes before the second. Many languages start counting positions at zero, but check the language before assuming its indexing rule.

A dictionary stores **key-value pairs**. You look up a value using a key instead of its position. A record is a group of named fields describing something; a dictionary can represent one. Here is language-neutral notation:

```text
SET place TO {"name": "Park A", "distance_metres": 250, "has_shade": true}
PRINT place["name"]
SET place["distance_metres"] TO 300
```

The keys are `name`, `distance_metres`, and `has_shade`. Their values have different types. Looking up `place["name"]` produces `"Park A"`; it does not mean "take the first entry". A key should identify one entry in this dictionary. A missing key needs handling; do not assume it returns zero.

You can put dictionaries inside an array:

```text
SET places TO [
    {"name": "Park A", "distance_metres": 250},
    {"name": "Park B", "distance_metres": 700}
]
FOR EACH place IN places
    PRINT place["name"]
END FOR
```

This prints Park A, then Park B. The array holds multiple places; each dictionary keeps one place's attributes together. In JavaScript, we will use an array of plain objects for this pattern. JavaScript also has a `Map` type for general key-value collections, but it is not needed for our examples.

Now trace a loop over a simpler array of numbers:

```text
SET distances TO [250, 700, 500]
SET count TO 0
FOR EACH distance IN distances
    IF distance <= 500
        SET count TO count + 1
    END IF
END FOR
PRINT count
```

Trace it on paper:

| Current distance | Test result | Count after this step |
| --- | --- | --- |
| 250 | true | 1 |
| 700 | false | 1 |
| 500 | true | 2 |

The assignment `count + 1` uses the old value, adds one, then stores the new value. Initialising `count` inside the loop would reset it every time.

A `WHILE` loop repeats while its condition stays true. It needs progress toward stopping. An instruction to keep asking until an answer is valid must also let a participant cancel. Otherwise it can trap them.

## 4. Functions, parameters, and return values

```text
FUNCTION is_near(distance, limit)
    RETURN distance <= limit
END FUNCTION

SET result TO is_near(250, 500)
PRINT result
```

`distance` and `limit` are parameters, names for inputs. `250` and `500` are the arguments supplied in this call. `RETURN` gives the result to the caller. `PRINT` displays something; it does not return the result for later calculations. A variable defined inside a function normally belongs to that function's scope.

Test the function with a boundary, a value on each side, and a missing value. Our tiny function assumes valid numbers. The caller must check missing or invalid input first.

## 5. External libraries, objects, and function calls

An external library is a collection of reusable code written outside your program. Loading or importing it makes its public features available. Its documentation describes its API: the names you can use, the inputs they expect, and the values they return.

An object can hold values and provide operations. An operation attached to an object is called a method. A dictionary is a way to organise data; a library object may also have behaviour, such as moving a map. Think through these steps before learning the exact JavaScript:

```text
LOAD mapping_library
SET map TO CALL mapping_library.create_map("map_container")
CALL map.set_view([latitude, longitude], zoom_level)
SET marker TO CALL mapping_library.create_marker([latitude, longitude])
CALL marker.add_to(map)
```

These names are invented pseudocode, not Leaflet syntax. The first call creates and returns a map object, which we keep in `map`. The next call asks that object to change its view. Creating an object and displaying it can be separate steps, as with the marker.

In our browser setup, HTML script tags load Leaflet from a URL. It provides the name `L`, whose functions create objects such as maps and markers. In other setups, an `import` statement can select named functions or objects from a module. Loading a library does not run every function it contains. Call only what you need, after it has loaded. Check the documented version and coordinate order rather than guessing the function's inputs.

Reference for later: [Leaflet quick start](https://leafletjs.com/examples/quick-start/). For now, point to the library, the function call, the arguments, and the returned object in the pseudocode above.

## 6. Events

Web pages also react to events:

```text
WHEN the visitor clicks "Add observation"
    READ the form
    CHECK the values
    IF values are valid
        ADD an observation to the collection
        PRINT the new count
    END IF
END EVENT
```

The event's steps run when the visitor acts, not simply because the page contains the button. Network replies also arrive later. We will learn how JavaScript waits for them.

## Exercise: count suitable places

Write pseudocode to count distances `[100, 500, 501, MISSING]` that are known and at most 500 metres. Use a variable, loop, condition, and a function that decides whether one valid distance qualifies. Print the count after the loop.

As a second variation, put each distance in a dictionary with a place name, store the dictionaries in an array, and print the names of qualifying places. Describe which library object you would need to show these places on a map.

Trace each step, then try an empty list and a limit of zero. Explain why a missing distance should not count as zero. You are done when a partner can follow your instructions without guessing.

<details><summary>Check your reasoning</summary>

The original list produces 2. An empty list produces 0. With the original list and a zero-metre limit the count is 0. The function returns a Boolean; the outer code updates and prints the count. Check for missing values before calling the comparison function.

</details>
