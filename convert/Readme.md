First, you need to install "Docker" to run the gotenburg server in the background.

After installation, in the command line run:

docker run --rm -p 3000:3000 thecodingmachine/gotenberg:6

Afterwards, install node.js and then install the necessary package (just one):

npm install

From here, place all the docs you would like to convert into a folder named input, and then in another terminal window, run:

node index.js