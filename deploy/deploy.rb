require 'net/ftp'

class Deploy

	# Variables basicas
	@env = ""
	@url_server = ""
	CONFIG_PATH = File.dirname(File.expand_path(__FILE__)).split('/')[0..-2].join('/')
	DIR_BUILD = "_build"
	PATH_FINAL = CONFIG_PATH + "/" + DIR_BUILD + "/"

	# Servidores FTP - array[server, user, pwd]
	# 0 - demo, 1 - production
	@servers = [
		["matchtalent.com.es", "webtalentdemo", "Hm69tu4~"],
		#["matchtalent.tests-mm.com", "ftp_matchtalent", "Icp6w2#5"],
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
		puts "-------------------------"
		ftp(@env)
	end
	
	def self.ftp(env)
		#dir = Dir.glob(PATH_FINAL + "**/*").reject {|fn| File.directory?(fn)}
		dir = Dir.glob(PATH_FINAL + "**/*")
		Net::FTP.open(@url_server[0]) do |ftp|
			ftp.login(@url_server[1], @url_server[2])
			ftp.passive = true
			ftp.debug_mode = true
			dir.each do |file|
				ftp.chdir('/')
				index = file.split("/").index(DIR_BUILD)
				output = file.split("/").drop(index + 1)
				if File.directory?(file)
					i = 0
					if output.length > 1
						while i < output.length - 1
							ftp.chdir(output[i])
							i+=1
						end
					end
					if !ftp.nlst.include?(File.basename(file))
						ftp.mkdir(File.basename(file))
					end
				else
					ftp.put(file, output.join("/"))
				end
			end
		end
		puts "-------------------------"
		puts "\nDeploy completed..."
	end

end

Deploy.init