require 'net/ftp'

class Deploy

	# Variables basicas
	:_build
	@env = ""
	@url_server = ""
	CONFIG_PATH = File.dirname(File.expand_path(__FILE__)).split('/')[0..-2].join('/')
	DIR_BUILD = CONFIG_PATH + "/#{:_build}/"

	# Servidores FTP - array[server, user, pwd]
	# 0 - demo, 1 - production
	@servers = [
		["matchtalent.com.es", "webtalentdemo", "Hm69tu4~"],
		["matchtalent.com.es", "webtalent", "Hm69tu4~"]
	]

	def self.init
		param = ARGV[0]
		case param
		when "demo"
			@env = "demo"
			@url_server = @servers[0]
		when "production"
			@env = "production"
			@url_server = @servers[1]
		else
			puts "Unknown enviroment #{param}. Aborting."
			return
		end
		puts "Deploying to #{@env}:"
		ftp(@env)
	end

	def self.ftp(env)
		dir = Dir.glob(DIR_BUILD + "**/*").reject {|fn| File.directory?(fn)}
		Net::FTP.open(@url_server[0]) do |ftp|
			ftp.login(@url_server[1], @url_server[2])
			ftp.passive = true
			ftp.debug_mode = true
			ftp.chdir('/')
			dir.each do |file|
				index = file.split("/").index("#{:_build}")
				ftp.put(file, file.split("/").drop(index + 1).join("/"))
			end
		end
		puts 20.times {|i| print "="}
		puts "\nDeploy completed..."
	end

end

Deploy.init